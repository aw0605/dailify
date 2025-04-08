import Link from "next/link";
import DailifyLogo from "../../public/Dailify.svg";
import "../styles/notFoundStyle.css";

function notFound() {
  return (
    <div className="container main">
      <DailifyLogo width="180" height="180" />
      <div>
        <h1>Page Not Found</h1>
        <p>페이지를 찾을 수 없습니다.</p>
      </div>
      <Link href="/">
        <button className="button">홈으로</button>
      </Link>
    </div>
  );
}

export default notFound;
