import api from './api';

// Description: Get all conversations with doctors
// Endpoint: GET /api/messages/conversations
// Request: {}
// Response: { conversations: Array<{ _id: string, doctorId: string, doctorName: string, doctorAvatar: string, lastMessage: string, lastMessageTime: string, unreadCount: number }> }
export const getConversations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        conversations: [
          {
            _id: 'conv_1',
            doctorId: 'doc_1',
            doctorName: 'Dr. Sarah Johnson',
            doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            lastMessage: 'The results look good. Please follow up in 2 weeks.',
            lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            unreadCount: 0
          },
          {
            _id: 'conv_2',
            doctorId: 'doc_2',
            doctorName: 'Dr. Michael Chen',
            doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
            lastMessage: 'I recommend starting treatment immediately.',
            lastMessageTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            unreadCount: 1
          }
        ]
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get('/api/messages/conversations');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get message history with a specific doctor
// Endpoint: GET /api/messages/conversation/:doctorId
// Request: {}
// Response: { messages: Array<{ _id: string, senderId: string, senderName: string, senderAvatar: string, content: string, timestamp: string, isRead: boolean }> }
export const getConversationMessages = (doctorId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        messages: [
          {
            _id: 'msg_1',
            senderId: 'patient_1',
            senderName: 'You',
            senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patient',
            content: 'Hello Dr. Johnson, I have concerns about a mole on my back.',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            isRead: true
          },
          {
            _id: 'msg_2',
            senderId: 'doc_1',
            senderName: 'Dr. Sarah Johnson',
            senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            content: 'I can help you with that. Please upload an image of the mole.',
            timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
            isRead: true
          },
          {
            _id: 'msg_3',
            senderId: 'patient_1',
            senderName: 'You',
            senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patient',
            content: 'I have uploaded the image. What do you think?',
            timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
            isRead: true
          },
          {
            _id: 'msg_4',
            senderId: 'doc_1',
            senderName: 'Dr. Sarah Johnson',
            senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            content: 'The results look good. Please follow up in 2 weeks.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            isRead: true
          }
        ]
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get(`/api/messages/conversation/${doctorId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Send a message to a doctor
// Endpoint: POST /api/messages/send
// Request: { doctorId: string, content: string, attachmentUrl?: string }
// Response: { _id: string, success: boolean, message: string }
export const sendMessage = (data: {
  doctorId: string;
  content: string;
  attachmentUrl?: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: 'msg_' + Date.now(),
        success: true,
        message: 'Message sent successfully'
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.post('/api/messages/send', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};