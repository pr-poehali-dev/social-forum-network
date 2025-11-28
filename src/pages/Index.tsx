import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import FeedTab from '@/components/FeedTab';
import ProfileTab from '@/components/ProfileTab';
import MessagesTab from '@/components/MessagesTab';
import ShopTab from '@/components/ShopTab';

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
        {activeTab === 'feed' && (
          <FeedTab 
            discussions={discussions}
            onNewDiscussion={() => setNewDiscussionOpen(true)}
            onSelectDiscussion={setSelectedDiscussion}
            onLike={handleLike}
            onSubscribe={handleSubscribe}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileTab 
            currentUser={currentUser}
            discussions={discussions}
          />
        )}
        {activeTab === 'messages' && (
          <MessagesTab messages={messages} />
        )}
        {activeTab === 'shop' && (
          <ShopTab 
            decorations={decorations}
            currentUserCoins={currentUser.coins}
            onBuyDecoration={handleBuyDecoration}
          />
        )}
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
