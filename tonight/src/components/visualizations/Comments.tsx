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
  date: string;
}

export default async function Comments({ date }: Props) {
  try {
    const comments = await getComments(date);

    return (
      <Table className="border m-1 w-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Operator</TableHead>
            <TableHead className="whitespace-nowrap">Time (UTC)</TableHead>
            <TableHead>Comment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.length > 0 ? (
            comments.map((comment: Comment, i: number) => (
              <TableRow key={i}>
                <TableCell>{comment.author}</TableCell>
                <TableCell>{comment.date}</TableCell>
                <TableCell
                  dangerouslySetInnerHTML={{ __html: removeTags(comment.text) }}
                />
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center" colSpan={3}>
                No comments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  } catch (e) {
    return <p>Error rendering comments: {(e as Error).message}</p>;
  }
}

// Removes HTML tags from a string, and replaces <br /> tags with newlines.
const removeTags = (str: string) => {
  if (str === null || str === "") return false;
  else str = str.toString();
  str = str.replace(/<[^>]*>/g, "");
  return str.replace(/\n/g, "<br />");
};
