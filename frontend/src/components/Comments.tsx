import { useOMP } from "../contexts/OMPContext";
import { dateToTime } from "../utils/date";

interface Comment {
  shiftid: number;
  date: string;
  author: string;
  telescope: string;
  text: string;
}

function Comments() {
  const { ompAPIData } = useOMP();
  const data = ompAPIData.comments;

  return (
    <>
      <table className="table table-bordered comments-table">
        <tbody>
          {data &&
            data.map((comment: Comment, i: number) => (
              <tr key={i}>
                <td>
                  {comment.author} <br />
                  {dateToTime(comment.date)}
                </td>
                <td
                  dangerouslySetInnerHTML={{ __html: removeTags(comment.text) }}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

// Removes HTML tags from a string, and replaces newlines with <br /> tags.
const removeTags = (str: string) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  str = str.replace(/<[^>]*>/g, "");
  return str.replace(/\n/g, "<br />");
};

export default Comments;
