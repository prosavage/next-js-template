export default function Start(props: { id: string }) {

}

export async function getServerSideProps({ params }) {
    const id = params.id as string;
  
    return { props: { id } };
  }
  