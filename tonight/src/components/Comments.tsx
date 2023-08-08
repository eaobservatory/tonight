import { dateToTime } from "@/utils/date";
import { getComments } from "@/utils/omp";
import { Comment } from "@/types/types";

export default async function Comments() {
  const comments = await getComments();

  return (
    <>
      <table>
        <tbody>
          {comments &&
            comments.map((comment: Comment, i: number) => (
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
