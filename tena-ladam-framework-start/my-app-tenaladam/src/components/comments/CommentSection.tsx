
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  avatarUrl?: string;
}

interface CommentSectionProps {
  medicineId: string;
}

const CommentSection = ({ medicineId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Meseret T.",
      content: "This medicine helped me with my chronic pain. I highly recommend it!",
      date: "2 days ago"
    },
    {
      id: 2,
      author: "Abebe K.",
      content: "I've been using this for 3 months now. Great results with minimal side effects.",
      date: "1 week ago"
    }
  ]);
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Add new comment
    const comment: Comment = {
      id: comments.length + 1,
      author: "You",
      content: newComment,
      date: "Just now"
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Comments & Experiences</h3>
      
      <form onSubmit={handleSubmitComment} className="mb-6">
        <Textarea 
          placeholder="Share your experience with this medicine..." 
          className="min-h-[100px]"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button type="submit" className="mt-2 bg-medical-darkpurple hover:bg-medical-purple">
          Post Comment
        </Button>
      </form>
      
      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="p-4 rounded-lg bg-white shadow-sm border">
            <div className="flex items-center mb-2">
              <Avatar className="h-8 w-8 mr-2">
                <div className="bg-medical-lightpurple rounded-full h-full w-full flex items-center justify-center text-medical-darkpurple font-semibold">
                  {comment.author.charAt(0)}
                </div>
              </Avatar>
              <div>
                <p className="font-medium">{comment.author}</p>
                <p className="text-xs text-gray-500">{comment.date}</p>
              </div>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
