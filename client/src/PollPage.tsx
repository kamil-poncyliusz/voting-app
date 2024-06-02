import { useParams } from "react-router-dom";
import "./PollPage.css";

function PollPage() {
  const idParam = useParams().id;
  const id = parseInt(idParam ?? "", 10);
  return (
    <div className="">
      <h1>Poll {id}</h1>
      <a href="/">Back to index page</a>
    </div>
  );
}

export default PollPage;
