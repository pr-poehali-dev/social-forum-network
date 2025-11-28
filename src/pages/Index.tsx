import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

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

type Message = {
  id: string;
  from: User;
  text: string;
  timestamp: string;
  unread: boolean;
};

type Decoration = {
  id: string;
  name: string;
  icon: string;
  price: number;
  category: string;
};

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'feed' | 'profile' | 'messages' | 'shop'>('feed');
  const [newDiscussionOpen, setNewDiscussionOpen] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [notifications, setNotifications] = useState(3);

  const currentUser: User = {
    id: '1',
    name: 'Мария Светлова',
    avatar: '/placeholder.svg',
    tags: [
      { id: 't1', label: '25 лет', color: 'bg-info' },
      { id: 't2', label: 'Москва', color: 'bg-success' },
      { id: 't3', label: 'Дизайн', color: 'bg-secondary' }
    ],
    bio: 'UX/UI дизайнер, любитель минимализма и хорошего кофе ☕',
    followers: 248,
    coins: 1250,
    decorations: ['✨', '🌟', '💫']
  };

  const discussions: Discussion[] = [
    {
      id: 'd1',
      author: {
        id: '2',
        name: 'Алексей Иванов',
        avatar: '/placeholder.svg',
        tags: [{ id: 't4', label: 'Программист', color: 'bg-primary' }],
        bio: '',
        followers: 156,
        coins: 890,
        decorations: []
      },
      title: 'Какие инструменты вы используете для прототипирования?',
      content: 'Всем привет! Интересно узнать, какие инструменты сейчас в тренде для создания интерактивных прототипов. Делитесь опытом!',
      tags: [
        { id: 't5', label: 'Дизайн', color: 'bg-secondary' },
        { id: 't6', label: 'Инструменты', color: 'bg-warning' }
      ],
      likes: 42,
      comments: 18,
      timestamp: '2 часа назад',
      isSubscribed: true
    },
    {
      id: 'd2',
      author: {
        id: '3',
        name: 'Екатерина Смирнова',
        avatar: '/placeholder.svg',
        tags: [{ id: 't7', label: 'Маркетолог', color: 'bg-accent' }],
        bio: '',
        followers: 312,
        coins: 1450,
        decorations: []
      },
      title: 'Лучшие практики создания посадочных страниц',
      content: 'Поделюсь своим опытом создания лендингов с высокой конверсией. Что для вас важнее всего?',
      tags: [
        { id: 't8', label: 'Маркетинг', color: 'bg-primary' },
        { id: 't9', label: 'Веб', color: 'bg-info' }
      ],
      likes: 67,
      comments: 23,
      timestamp: '5 часов назад'
    },
    {
      id: 'd3',
      author: {
        id: '4',
        name: 'Дмитрий Петров',
        avatar: '/placeholder.svg',
        tags: [{ id: 't10', label: 'Фотограф', color: 'bg-success' }],
        bio: '',
        followers: 891,
        coins: 2100,
        decorations: []
      },
      title: 'Обработка фото: Lightroom или Photoshop?',
      content: 'Давайте обсудим плюсы и минусы каждой программы для разных задач',
      tags: [
        { id: 't11', label: 'Фото', color: 'bg-warning' },
        { id: 't12', label: 'Софт', color: 'bg-secondary' }
      ],
      likes: 89,
      comments: 34,
      timestamp: '1 день назад',
      isSubscribed: true
    }
  ];

  const messages: Message[] = [
    {
      id: 'm1',
      from: {
        id: '2',
        name: 'Алексей Иванов',
        avatar: '/placeholder.svg',
        tags: [],
        bio: '',
        followers: 156,
        coins: 890,
        decorations: []
      },
      text: 'Привет! Смотрел твоё портфолио, очень впечатляет 👍',
      timestamp: '15 мин назад',
      unread: true
    },
    {
      id: 'm2',
      from: {
        id: '3',
        name: 'Екатерина Смирнова',
        avatar: '/placeholder.svg',
        tags: [],
        bio: '',
        followers: 312,
        coins: 1450,
        decorations: []
      },
      text: 'Хочу посоветоваться по поводу дизайна проекта',
      timestamp: '1 час назад',
      unread: true
    },
    {
      id: 'm3',
      from: {
        id: '5',
        name: 'Ольга Новикова',
        avatar: '/placeholder.svg',
        tags: [],
        bio: '',
        followers: 89,
        coins: 340,
        decorations: []
      },
      text: 'Спасибо за совет в обсуждении!',
      timestamp: '3 часа назад',
      unread: false
    }
  ];

  const decorations: Decoration[] = [
    { id: 'dec1', name: 'Звёздочка', icon: '⭐', price: 50, category: 'Базовые' },
    { id: 'dec2', name: 'Корона', icon: '👑', price: 200, category: 'Премиум' },
    { id: 'dec3', name: 'Огонь', icon: '🔥', price: 100, category: 'Базовые' },
    { id: 'dec4', name: 'Радуга', icon: '🌈', price: 150, category: 'Премиум' },
    { id: 'dec5', name: 'Молния', icon: '⚡', price: 120, category: 'Базовые' },
    { id: 'dec6', name: 'Бриллиант', icon: '💎', price: 300, category: 'Премиум' },
    { id: 'dec7', name: 'Цветок', icon: '🌸', price: 80, category: 'Базовые' },
    { id: 'dec8', name: 'Крылья', icon: '🦋', price: 250, category: 'Премиум' }
  ];

  const handleLike = (discussionId: string) => {
    toast({
      title: '💜',
      description: 'Обсуждение добавлено в избранное',
    });
  };

  const handleSubscribe = (discussionId: string) => {
    toast({
      title: '🔔',
      description: 'Вы подписались на обновления',
    });
  };

  const handleBuyDecoration = (decoration: Decoration) => {
    if (currentUser.coins >= decoration.price) {
      toast({
        title: '✨ Украшение куплено!',
        description: `Вы купили ${decoration.icon} за ${decoration.price} монет`,
      });
    } else {
      toast({
        title: '❌ Недостаточно монет',
        description: `Нужно ещё ${decoration.price - currentUser.coins} монет`,
        variant: 'destructive'
      });
    }
  };

  const renderFeed = () => (
    <div className="space-y-4 animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Лента обсуждений</h1>
        <Button 
          onClick={() => setNewDiscussionOpen(true)}
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
          onClick={() => setSelectedDiscussion(discussion)}
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
                handleLike(discussion.id);
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
                handleSubscribe(discussion.id);
              }}
            >
              <Icon name={discussion.isSubscribed ? "BellOff" : "Bell"} size={18} />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderProfile = () => (
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

  const renderMessages = () => (
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

  const renderShop = () => (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Магазин украшений</h1>
        <div className="flex items-center gap-2 px-4 py-2 neomorph rounded-xl">
          <Icon name="Coins" size={20} className="text-secondary" />
          <span className="font-semibold">{currentUser.coins}</span>
        </div>
      </div>

      {['Базовые', 'Премиум'].map(category => (
        <div key={category}>
          <h3 className="font-semibold text-lg mb-4">{category}</h3>
          <div className="grid grid-cols-2 gap-4">
            {decorations.filter(d => d.category === category).map(decoration => (
              <Card 
                key={decoration.id}
                className="neomorph border-0 overflow-hidden hover:shadow-lg transition-all"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3">{decoration.icon}</div>
                  <h4 className="font-semibold mb-2">{decoration.name}</h4>
                  <div className="flex items-center justify-center gap-1 text-secondary mb-3">
                    <Icon name="Coins" size={16} />
                    <span className="font-semibold">{decoration.price}</span>
                  </div>
                  <Button 
                    size="sm"
                    className="w-full neomorph neomorph-hover rounded-xl"
                    onClick={() => handleBuyDecoration(decoration)}
                  >
                    Купить
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b neomorph">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Community
            </h1>
            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Icon name="Bell" size={22} />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="neomorph border-0">
                  <h2 className="text-xl font-bold mb-6">Уведомления</h2>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <p className="text-sm font-medium">Новый комментарий</p>
                      <p className="text-xs text-muted-foreground mt-1">Алексей ответил на ваш пост</p>
                    </div>
                    <div className="p-3 rounded-xl bg-secondary/10">
                      <p className="text-sm font-medium">Новый подписчик</p>
                      <p className="text-xs text-muted-foreground mt-1">Екатерина подписалась на вас</p>
                    </div>
                    <div className="p-3 rounded-xl bg-success/50">
                      <p className="text-sm font-medium">Ежедневная награда</p>
                      <p className="text-xs text-muted-foreground mt-1">Вы получили 50 монет</p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setActiveTab('profile')}
                className="rounded-full"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentUser.avatar} />
                  <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-2xl mx-auto px-4 py-6">
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'messages' && renderMessages()}
        {activeTab === 'shop' && renderShop()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t neomorph z-50">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-around">
            <Button
              variant={activeTab === 'feed' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setActiveTab('feed')}
              className={`rounded-2xl ${activeTab === 'feed' ? 'neomorph-pressed' : ''}`}
            >
              <Icon name="Home" size={22} />
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setActiveTab('messages')}
              className={`rounded-2xl relative ${activeTab === 'messages' ? 'neomorph-pressed' : ''}`}
            >
              <Icon name="MessageSquare" size={22} />
              {messages.filter(m => m.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
                  {messages.filter(m => m.unread).length}
                </span>
              )}
            </Button>
            <Button
              variant={activeTab === 'shop' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setActiveTab('shop')}
              className={`rounded-2xl ${activeTab === 'shop' ? 'neomorph-pressed' : ''}`}
            >
              <Icon name="ShoppingBag" size={22} />
            </Button>
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setActiveTab('profile')}
              className={`rounded-2xl ${activeTab === 'profile' ? 'neomorph-pressed' : ''}`}
            >
              <Icon name="User" size={22} />
            </Button>
          </div>
        </div>
      </nav>

      <Dialog open={newDiscussionOpen} onOpenChange={setNewDiscussionOpen}>
        <DialogContent className="neomorph border-0 max-w-lg">
          <DialogHeader>
            <DialogTitle>Создать обсуждение</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Заголовок</label>
              <Input 
                placeholder="О чём хотите поговорить?"
                className="neomorph-inset border-0"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Описание</label>
              <Textarea 
                placeholder="Расскажите подробнее..."
                className="neomorph-inset border-0 min-h-[120px]"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Теги</label>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-secondary cursor-pointer">Дизайн</Badge>
                <Badge className="bg-primary cursor-pointer">Разработка</Badge>
                <Badge className="bg-warning cursor-pointer">Маркетинг</Badge>
                <Badge className="bg-success cursor-pointer">Творчество</Badge>
                <Badge variant="outline" className="cursor-pointer">
                  <Icon name="Plus" size={14} className="mr-1" />
                  Добавить
                </Badge>
              </div>
            </div>
            <Button 
              className="w-full neomorph neomorph-hover rounded-xl"
              onClick={() => {
                setNewDiscussionOpen(false);
                toast({
                  title: '✨ Обсуждение создано!',
                  description: 'Ваша тема появится в ленте',
                });
              }}
            >
              Опубликовать
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={selectedDiscussion !== null} onOpenChange={() => setSelectedDiscussion(null)}>
        <DialogContent className="neomorph border-0 max-w-2xl max-h-[80vh]">
          {selectedDiscussion && (
            <ScrollArea className="max-h-[70vh]">
              <DialogHeader className="mb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={selectedDiscussion.author.avatar} />
                    <AvatarFallback>{selectedDiscussion.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold">{selectedDiscussion.author.name}</span>
                      {selectedDiscussion.author.tags.map(tag => (
                        <Badge key={tag.id} variant="secondary" className={`${tag.color} text-xs`}>
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{selectedDiscussion.timestamp}</span>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <DialogTitle className="text-xl mb-3">{selectedDiscussion.title}</DialogTitle>
                  <p className="text-muted-foreground mb-3">{selectedDiscussion.content}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedDiscussion.tags.map(tag => (
                      <Badge key={tag.id} className={tag.color}>
                        {tag.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 py-3 border-y">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Icon name="Heart" size={18} className="text-primary" />
                    <span>{selectedDiscussion.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Icon name="MessageCircle" size={18} className="text-secondary" />
                    <span>{selectedDiscussion.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 ml-auto">
                    <Icon name="Share2" size={18} />
                  </Button>
                </div>

                <div className="space-y-3 pt-4">
                  <h4 className="font-semibold">Комментарии</h4>
                  <div className="p-3 rounded-xl neomorph-inset">
                    <Textarea 
                      placeholder="Напишите комментарий..."
                      className="border-0 bg-transparent resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <Button size="sm" className="neomorph neomorph-hover rounded-xl">
                        Отправить
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex gap-3 p-3 rounded-xl bg-muted/30">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>U{i}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">Пользователь {i}</span>
                            <span className="text-xs text-muted-foreground">{i}ч назад</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Отличная тема! Я тоже интересуюсь этим вопросом.
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
