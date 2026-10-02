"use client";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorite } from "@/context/FavoriteContext";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorite();
  const router = useRouter();
  const favorited = isFavorite(user.id);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group border border-border bg-card transition-all hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {initials}
          </div>
          <CardTitle>{user.name}</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-card-foreground">{user.email}</p>

<p className="mt-1 text-sm text-card-foreground">
  {user.company.name}
</p>

        <div className="mt-4 flex gap-2">
  <Button
    onClick={() => router.push(`/users/${user.id}`)}
    className="flex-1 rounded-full"
  >
    View Profile
  </Button>
  <Button
    onClick={() => (favorited ? removeFavorite(user.id) : addFavorite(user))}
    variant={favorited ? "default" : "outline"}
    className="rounded-full"
  >
    <Heart className={favorited ? "fill-current" : ""} size={16} />
    {favorited ? "Favourite" : "Add to Favourite"}
  </Button>
</div>
      </CardContent>
    </Card>
  );
}