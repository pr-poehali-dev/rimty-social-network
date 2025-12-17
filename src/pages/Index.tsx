import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked: boolean;
}

interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  followers: number;
  isVerified: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Анна Петрова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
      content: 'Запустили новую функцию в Rimty! Теперь вы можете делиться моментами с друзьями ещё быстрее 🚀',
      likes: 124,
      comments: 18,
      timestamp: '2 часа назад',
      isLiked: false,
    },
    {
      id: 2,
      author: 'Дмитрий Иванов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dmitry',
      content: 'Отличная атмосфера на конференции! Встретил много интересных людей и обсудили будущее соцсетей',
      likes: 89,
      comments: 12,
      timestamp: '5 часов назад',
      isLiked: true,
    },
    {
      id: 3,
      author: 'Мария Сидорова',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      content: 'Кто-нибудь пробовал новую аналитику в Rimty? Впечатления? 📊',
      likes: 45,
      comments: 23,
      timestamp: '1 день назад',
      isLiked: false,
    },
  ]);

  const [recommendedUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Елена Волкова',
      username: '@evolkova',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      followers: 12500,
      isVerified: true,
    },
    {
      id: 2,
      name: 'Игорь Смирнов',
      username: '@ismirnov',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Igor',
      followers: 8900,
      isVerified: false,
    },
    {
      id: 3,
      name: 'Ольга Кузнецова',
      username: '@okuznetsova',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olga',
      followers: 15300,
      isVerified: true,
    },
  ]);

  const [chats] = useState([
    {
      id: 1,
      name: 'Команда Rimty',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Team',
      lastMessage: 'Добро пожаловать в Rimty!',
      time: '10:30',
      unread: 2,
    },
    {
      id: 2,
      name: 'Виктор Попов',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Viktor',
      lastMessage: 'Отлично, созвонимся завтра',
      time: 'Вчера',
      unread: 0,
    },
    {
      id: 3,
      name: 'Наталья Лебедева',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Natalia',
      lastMessage: 'Спасибо за помощь!',
      time: '3 дня',
      unread: 0,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const currentUser = {
    name: 'Александр Новиков',
    username: '@anoviков',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    followers: 1250,
    following: 890,
    posts: 342,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rimty
            </h1>
            <div className="relative hidden md:block">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Поиск в Rimty..."
                className="w-80 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Avatar className="cursor-pointer">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>АН</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <Icon name="Home" size={18} />
              <span className="hidden sm:inline">Лента</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Icon name="User" size={18} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Icon name="MessageCircle" size={18} />
              <span className="hidden sm:inline">Сообщения</span>
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Icon name="Sparkles" size={18} />
              <span className="hidden sm:inline">Рекомендации</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Icon name="Search" size={18} />
              <span className="hidden sm:inline">Поиск</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>АН</AvatarFallback>
                  </Avatar>
                  <Input placeholder="Что нового?" className="flex-1" />
                </div>
              </CardHeader>
            </Card>

            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow animate-scale-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={post.avatar} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{post.author}</CardTitle>
                        <CardDescription>{post.timestamp}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreVertical" size={18} />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{post.content}</p>
                </CardContent>
                <CardFooter className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={post.isLiked ? 'text-red-500' : ''}
                  >
                    <Icon name={post.isLiked ? 'Heart' : 'Heart'} size={18} className={post.isLiked ? 'fill-current' : ''} />
                    <span className="ml-2">{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MessageCircle" size={18} />
                    <span className="ml-2">{post.comments}</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="Share2" size={18} />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="profile" className="animate-fade-in">
            <Card>
              <CardHeader className="text-center">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={currentUser.avatar} />
                    <AvatarFallback>АН</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-2xl">{currentUser.name}</CardTitle>
                    <CardDescription className="text-base">{currentUser.username}</CardDescription>
                  </div>
                  <div className="flex gap-6 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{currentUser.posts}</div>
                      <div className="text-sm text-muted-foreground">Посты</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{currentUser.followers}</div>
                      <div className="text-sm text-muted-foreground">Подписчики</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{currentUser.following}</div>
                      <div className="text-sm text-muted-foreground">Подписки</div>
                    </div>
                  </div>
                  <Button className="mt-4">
                    <Icon name="Settings" size={18} className="mr-2" />
                    Редактировать профиль
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Сообщения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer"
                  >
                    <Avatar>
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{chat.name}</h4>
                        <span className="text-sm text-muted-foreground">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <Badge variant="default" className="rounded-full">{chat.unread}</Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Рекомендуемые пользователи</CardTitle>
                <CardDescription>Люди, которые могут быть вам интересны</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{user.name}</h4>
                          {user.isVerified && (
                            <Icon name="BadgeCheck" size={16} className="text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{user.username}</p>
                        <p className="text-xs text-muted-foreground">{user.followers.toLocaleString()} подписчиков</p>
                      </div>
                    </div>
                    <Button>Подписаться</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="search" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Поиск</CardTitle>
                <div className="relative mt-4">
                  <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Поиск пользователей, постов, тегов..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {searchQuery ? (
                  <div className="text-center py-8">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Поиск по запросу: {searchQuery}</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Введите запрос для поиска</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
