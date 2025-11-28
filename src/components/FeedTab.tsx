import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
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

type FeedTabProps = {
  discussions: Discussion[];
  onNewDiscussion: () => void;
  onSelectDiscussion: (discussion: Discussion) => void;
  onLike: (discussionId: string) => void;
  onSubscribe: (discussionId: string) => void;
};

const FeedTab = ({ discussions, onNewDiscussion, onSelectDiscussion, onLike, onSubscribe }: FeedTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Лента обсуждений</h1>
        <Button 
          onClick={onNewDiscussion}
          className="neomorph neomorph-hover rounded-2xl"
        >
          <Icon name="Plus" size={20} className="mr-2" />
          Создать
        </Button>
      </div>

      {discussions.map((discussion) => (
        <Card 
          key={discussion.id} 
          className="neomorph border-0 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-up"
          onClick={() => onSelectDiscussion(discussion)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12 border-2 border-primary/20">
                <AvatarImage src={discussion.author.avatar} />
                <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-foreground">{discussion.author.name}</span>
                  {discussion.author.tags.map(tag => (
                    <Badge key={tag.id} variant="secondary" className={`${tag.color} text-xs`}>
                      {tag.label}
                    </Badge>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pb-3">
            <h3 className="font-semibold text-lg mb-2 text-foreground">{discussion.title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{discussion.content}</p>
            <div className="flex flex-wrap gap-2">
              {discussion.tags.map(tag => (
                <Badge key={tag.id} variant="outline" className={`${tag.color} text-xs`}>
                  {tag.label}
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardFooter className="pt-3 border-t flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onLike(discussion.id);
              }}
            >
              <Icon name="Heart" size={18} className="text-primary" />
              <span className="text-sm">{discussion.likes}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="MessageCircle" size={18} className="text-secondary" />
              <span className="text-sm">{discussion.comments}</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2 ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                onSubscribe(discussion.id);
              }}
            >
              <Icon name={discussion.isSubscribed ? "BellOff" : "Bell"} size={18} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default FeedTab;
