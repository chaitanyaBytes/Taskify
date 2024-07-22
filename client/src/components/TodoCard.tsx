import { Check, Ban } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CardProps extends React.ComponentProps<typeof Card> {
  _id?: string;
  title?: string;
  description?: string;
  done?: boolean;
  className?: string;
}

function TodoCard({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle className="">{props.title}</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <div className="space-y-1">
            <p className="text-2xl font-medium leading-none">
              {props.description}
            </p>
            <p className="text-sm text-muted-foreground"></p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="space-x-3">
        <Button className="w-full">
          <Check className="mr-2 h-4 w-4" />{" "}
          {props.done ? "Completed" : "Mark Done"}
        </Button>
        <Button className="w-full">
          <Ban className="mr-2 h-4 w-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

export default TodoCard;
