import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { useRouter } from 'next/router';
import { useSingleUploadMutation } from 'generated';
import { useState } from 'react';

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
  console.log(`🇻🇳 [LOG]: UploadFile -> progress`, progress);
  const [singleUpload, { loading, error }] = useSingleUploadMutation();

  const onChange = async ({ target: { validity, files } }: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (validity.valid && files && files[0]) {
        let abort: any;
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
                abort = abortHandler;
              },
            },
          },
        }).catch((err) => console.log(err));

        return () => {
          if (abort) {
            abort();
          }
        };
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

  return (
    <>
      <input type="file" required onChange={onChange} />
    </>
  );
};

export default Index;
