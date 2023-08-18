import { dateToTime } from "@/utils/date";
import { getComments } from "@/utils/omp";
import { Comment } from "@/types/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  date?: string;
}

export default async function Comments({ date = "live" }: Props) {
  const comments = await getComments(date);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Operator</TableHead>
          <TableHead>Comment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {comments &&
          comments.map((comment: Comment, i: number) => (
            <TableRow key={i}>
              <TableCell>
                {comment.author} <br />
                {dateToTime(comment.date)}
              </TableCell>
              <TableCell
                dangerouslySetInnerHTML={{ __html: removeTags(comment.text) }}
              />
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

// Removes HTML tags from a string, and replaces <br /> tags with newlines.
const removeTags = (str: string) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  str = str.replace(/<[^>]*>/g, "");
  return str.replace(/\n/g, "<br />");
};
