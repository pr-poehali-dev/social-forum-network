import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type Tag = {
  id: string;
  label: string;
  color: string;
};

type User = {
  id: string;
  name: string;
  avatar: string;
  tags: Tag[];
  bio: string;
  followers: number;
  coins: number;
  decorations: string[];
};

type Discussion = {
  id: string;
  author: User;
  title: string;
  content: string;
  tags: Tag[];
  likes: number;
  comments: number;
  timestamp: string;
  isSubscribed?: boolean;
};

type ProfileTabProps = {
  currentUser: User;
  discussions: Discussion[];
};

const ProfileTab = ({ currentUser, discussions }: ProfileTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <Card className="neomorph border-0">
        <CardHeader>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="text-2xl">{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 flex gap-1">
                {currentUser.decorations.map((dec, idx) => (
                  <span key={idx} className="text-xl">{dec}</span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">{currentUser.name}</h2>
              <p className="text-muted-foreground text-sm">{currentUser.bio}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {currentUser.tags.map(tag => (
                <Badge key={tag.id} className={`${tag.color}`}>
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 neomorph-inset rounded-xl">
              <div className="text-2xl font-bold text-primary">{currentUser.followers}</div>
              <div className="text-xs text-muted-foreground">Подписчиков</div>
            </div>
            <div className="text-center p-4 neomorph-inset rounded-xl">
              <div className="text-2xl font-bold text-secondary">{currentUser.coins}</div>
              <div className="text-xs text-muted-foreground">Монет</div>
            </div>
          </div>
          <Button className="w-full neomorph neomorph-hover rounded-xl">
            <Icon name="Settings" size={18} className="mr-2" />
            Редактировать профиль
          </Button>
        </CardContent>
      </Card>

      <Card className="neomorph border-0">
        <CardHeader>
          <h3 className="font-semibold text-lg">Мои подписки</h3>
        </CardHeader>
        <CardContent className="space-y-3">
          {discussions.filter(d => d.isSubscribed).map(discussion => (
            <div key={discussion.id} className="flex items-center gap-3 p-3 rounded-xl neomorph-inset">
              <Icon name="Bell" size={18} className="text-primary" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{discussion.title}</p>
                <p className="text-xs text-muted-foreground">by {discussion.author.name}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
