import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

type User = {
  id: string;
  name: string;
  avatar: string;
  tags: any[];
  bio: string;
  followers: number;
  coins: number;
  decorations: string[];
};

type Message = {
  id: string;
  from: User;
  text: string;
  timestamp: string;
  unread: boolean;
};

type MessagesTabProps = {
  messages: Message[];
};

const MessagesTab = ({ messages }: MessagesTabProps) => {
  return (
    <div className="space-y-4 animate-fade-in pb-20">
      <h1 className="text-2xl font-bold mb-6">Сообщения</h1>
      
      {messages.map((message) => (
        <Card 
          key={message.id}
          className={`neomorph border-0 cursor-pointer hover:shadow-lg transition-all ${
            message.unread ? 'bg-primary/5' : ''
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={message.from.avatar} />
                <AvatarFallback>{message.from.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-foreground">{message.from.name}</span>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{message.text}</p>
              </div>
              {message.unread && (
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MessagesTab;
