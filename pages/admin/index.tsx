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
        <div>
          <p>raise your weapon</p>
        </div>
    )
}