"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

const SubmitButton = ({
  isPending,
  fullWidth,
}: {
  isPending: boolean;
  fullWidth?: boolean;
}) => {
  return (
    <Button
      type="submit"
      disabled={isPending}
      variant="default"
      className={`text-white ${fullWidth && "w-full"}`}
    >
      {isPending ? (
        <span className="flex items-center gap-4">
          <LoaderCircle className="animate-spin" /> Submitting...
        </span>
      ) : (
        <span>Submit</span>
      )}
    </Button>
  );
};

export default SubmitButton;
