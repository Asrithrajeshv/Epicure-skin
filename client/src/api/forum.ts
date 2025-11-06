import api from './api';

// Description: Get all forum topics
// Endpoint: GET /api/forum/topics
// Request: {}
// Response: { topics: Array<{ _id: string, title: string, category: string, author: string, authorAvatar: string, createdAt: string, replyCount: number, likeCount: number, isSolved: boolean }> }
export const getForumTopics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        topics: [
          {
            _id: 'topic_1',
            title: 'Best practices for sun protection',
            category: 'Prevention & Care',
            author: 'Sarah M.',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            replyCount: 12,
            likeCount: 45,
            isSolved: false
          },
          {
            _id: 'topic_2',
            title: 'My experience with eczema treatment',
            category: 'Treatment Experiences',
            author: 'John D.',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JohnD',
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            replyCount: 8,
            likeCount: 32,
            isSolved: true
          },
          {
            _id: 'topic_3',
            title: 'Tips for managing psoriasis in winter',
            category: 'Skin Condition Tips',
            author: 'Emma L.',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaL',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            replyCount: 15,
            likeCount: 58,
            isSolved: false
          },
          {
            _id: 'topic_4',
            title: 'General discussion about skin health',
            category: 'General Discussion',
            author: 'Mike T.',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MikeT',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
            replyCount: 22,
            likeCount: 67,
            isSolved: false
          }
        ]
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get('/api/forum/topics');
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Get single forum topic with replies
// Endpoint: GET /api/forum/topics/:id
// Request: {}
// Response: { _id: string, title: string, category: string, author: string, authorAvatar: string, content: string, createdAt: string, likeCount: number, isSolved: boolean, replies: Array<{ _id: string, author: string, authorAvatar: string, content: string, createdAt: string, likeCount: number }> }
export const getForumTopic = (topicId: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: topicId,
        title: 'Best practices for sun protection',
        category: 'Prevention & Care',
        author: 'Sarah M.',
        authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahM',
        content: 'I have been struggling with sun protection for years. What are the best practices you all follow? I am particularly interested in finding a good sunscreen that does not leave a white cast.',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        likeCount: 45,
        isSolved: false,
        replies: [
          {
            _id: 'reply_1',
            author: 'Dr. Sarah Johnson',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DrSarah',
            content: 'Great question! I recommend using mineral sunscreen with zinc oxide. It provides excellent protection and is less likely to cause irritation.',
            createdAt: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
            likeCount: 23
          },
          {
            _id: 'reply_2',
            author: 'Emma L.',
            authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaL',
            content: 'I use a combination of SPF 50+ sunscreen and protective clothing. The key is reapplication every 2 hours.',
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            likeCount: 18
          }
        ]
      });
    }, 500);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.get(`/api/forum/topics/${topicId}`);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Create a new forum topic
// Endpoint: POST /api/forum/topics
// Request: { title: string, category: string, content: string }
// Response: { _id: string, success: boolean, message: string }
export const createForumTopic = (data: {
  title: string;
  category: string;
  content: string;
}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: 'topic_' + Date.now(),
        success: true,
        message: 'Topic created successfully'
      });
    }, 1000);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.post('/api/forum/topics', data);
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};

// Description: Reply to a forum topic
// Endpoint: POST /api/forum/topics/:id/replies
// Request: { content: string }
// Response: { _id: string, success: boolean, message: string }
export const replyToTopic = (topicId: string, content: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        _id: 'reply_' + Date.now(),
        success: true,
        message: 'Reply posted successfully'
      });
    }, 1000);
  });

  // Uncomment to make actual API call
  // try {
  //   return await api.post(`/api/forum/topics/${topicId}/replies`, { content });
  // } catch (error) {
  //   throw new Error(error?.response?.data?.message || error.message);
  // }
};