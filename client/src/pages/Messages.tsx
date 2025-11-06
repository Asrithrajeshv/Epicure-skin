import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Send, Loader2 } from 'lucide-react';
import { getConversations, getConversationMessages, sendMessage } from '@/api/messages';
import { useToast } from '@/hooks/useToast';

interface Conversation {
  _id: string;
  doctorId: string;
  doctorName: string;
  doctorAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface Message {
  _id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export function Messages() {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        const data = await getConversations();
        setConversations((data as { conversations: Conversation[] }).conversations);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load conversations',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [toast]);

  useEffect(() => {
    if (!selectedConversation) return;

    const loadMessages = async () => {
      try {
        setMessagesLoading(true);
        const data = await getConversationMessages(selectedConversation.doctorId);
        setMessages((data as { messages: Message[] }).messages);
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load messages',
          variant: 'destructive'
        });
      } finally {
        setMessagesLoading(false);
      }
    };

    loadMessages();
  }, [selectedConversation, toast]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation) return;

    try {
      setSending(true);
      await sendMessage({
        doctorId: selectedConversation.doctorId,
        content: messageText
      });

      setMessages([
        ...messages,
        {
          _id: 'msg_' + Date.now(),
          senderId: 'patient_1',
          senderName: 'You',
          senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          content: messageText,
          timestamp: new Date().toISOString(),
          isRead: true
        }
      ]);

      setMessageText('');
      toast({
        title: 'Success',
        description: 'Message sent successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-200px)] pb-20">
      {/* Conversations List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Conversations</CardTitle>
          <CardDescription>{conversations.length} conversations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : conversations.length === 0 ? (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>No conversations yet</AlertDescription>
            </Alert>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => setSelectedConversation(conv)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedConversation?._id === conv._id
                    ? 'bg-blue-100 dark:bg-blue-900'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={conv.doctorAvatar} />
                    <AvatarFallback>{conv.doctorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{conv.doctorName}</p>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <Badge variant="default">{conv.unreadCount}</Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Messages */}
      <Card className="md:col-span-2 flex flex-col">
        {selectedConversation ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={selectedConversation.doctorAvatar} />
                  <AvatarFallback>{selectedConversation.doctorName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedConversation.doctorName}</CardTitle>
                  <CardDescription>Online</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`flex ${msg.senderId === 'patient_1' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.senderId === 'patient_1'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </CardContent>

            <div className="border-t p-4 space-y-3">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="resize-none"
                  rows={3}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={sending || !messageText.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
              >
                {sending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a conversation to start messaging</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}