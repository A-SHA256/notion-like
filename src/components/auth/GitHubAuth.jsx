import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logInWithGithub } from "@/slices/authSlice";
import { useRouter } from "next/navigation";

export default function GitHubAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);
  const handleGitHubLogin = async () => {
    const res = await dispatch(logInWithGithub());
    console.log(res);
    if (res.meta.requestStatus === "fulfilled") {
      router.push("/notes");
    } else {
      console.error("Github login failed:", res.error.message)
    }
  };
  return (
    <div>
      <button
        disabled={loading}
        onClick={handleGitHubLogin}
        className="w-full py-2 mt-4 bg-gray-800 text-white rounded hover:bg-gray-900"
      >
        Sign In With Github
      </button>
      {loading && <p>Loading</p>}
    </div>
  );
}
