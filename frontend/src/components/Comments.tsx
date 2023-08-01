import { useContext } from "react";
import { dateToTime } from "../utils/date";
import { APIContext } from "../App";

interface Comment {
  shiftid: number;
  date: string;
  author: string;
  telescope: string;
  text: string;
}

function Comments() {
  const contextValue = useContext(APIContext) ?? {};
  const data = contextValue.commentsAPIData
    ? (contextValue.commentsAPIData as Comment[])
    : [];

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
