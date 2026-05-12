import { Star } from "lucide-react";

type RatingProps = {
  rate: number;
};

function Rating({ rate }: RatingProps) {
  let newRate = Math.floor(rate);

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${
            i <= newRate ? "fill-yellow" : "fill-slate300"
          } w-6 h-6`}
        />
      ))}
    </div>
  );
}

export default Rating;
