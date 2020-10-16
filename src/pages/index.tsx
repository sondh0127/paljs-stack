import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { useRouter } from 'next/router';
import { useSingleUploadMutation } from 'generated';
import { useRef, useState } from 'react';

const Index = () => {
  const router = useRouter();
  return (
    <Card>
      <CardBody style={{ textAlign: 'center' }}>
        <Button onClick={() => router.push('/admin')}>Go To Admin Pages</Button>
        <UploadFile />
      </CardBody>
    </Card>
  );
};

const UploadFile = () => {
  const [progress, setProgress] = useState<number>(0);
  const [singleUpload, { error }] = useSingleUploadMutation();
  const abortRef = useRef<any>(null);

  const onChange = async ({ target: { validity, files } }: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (validity.valid && files && files[0]) {
        await singleUpload({
          variables: {
            file: files[0],
          },
          context: {
            fetchOptions: {
              onProgress: (ev: ProgressEvent) => {
                setProgress(ev.loaded / ev.total);
              },
              onAbortPossible: (abortHandler: any) => {
                abortRef.current = abortHandler;
              },
            },
          },
        }).catch((err) => console.log(err));

        return () => {
          if (abortRef.current) {
            abortRef.current?.();
          }
        };
      }
    } catch (err) {
      console.error(err);
    }
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <div>
      <input type="file" required onChange={onChange} />
      <div>progress: {(progress * 100).toFixed(2)}%</div>
      <Button
        onClick={() => {
          if (abortRef.current) {
            abortRef.current?.();
          }
        }}
      >
        Abort
      </Button>
    </div>
  );
};

export default Index;
