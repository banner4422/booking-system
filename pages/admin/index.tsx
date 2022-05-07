import { NextPageContext } from "next"
import { useRouter } from "next/router";
import { getSession } from "../../utils/admin";

export default function Home() {
  /*
  const router = useRouter();
  const { data: session, status } = useSession({ required: true, onUnauthenticated() {
    router.push('/', '/', {})
  }});
    const loading = status === 'loading'
    */
    return (
        <div></div>
    )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }

  if (session.user?.admin === false) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}