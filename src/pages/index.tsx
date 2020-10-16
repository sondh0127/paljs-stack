import { Card, CardBody } from '@paljs/ui/Card';
import { Button } from '@paljs/ui/Button';
import { useRouter } from 'next/router';
import { useSingleUploadMutation } from 'generated';

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
  const [singleUpload, { loading, error }] = useSingleUploadMutation();
  const onChange = async ({ target: { validity, files } }: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (validity.valid && files && files[0]) {
        await singleUpload({ variables: { file: files[0] } });
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
