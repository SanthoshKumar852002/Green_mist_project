import React from 'react';
import { Facebook, Twitter, Linkedin, Share2, MessageCircle } from 'lucide-react';

const SocialShare = ({ url, title, description }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description);
  
  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'hover:bg-sky-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`,
      color: 'hover:bg-blue-700'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'hover:bg-green-500'
    }
  ];
  
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-500 font-medium">Share:</span>
      {shareLinks.map(({ name, icon: Icon, url, color }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-2 rounded-full bg-gray-100 text-gray-600 transition-all ${color} hover:text-white`}
          aria-label={`Share on ${name}`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
      {navigator.share && (
        <button
          onClick={handleNativeShare}
          className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-emerald-500 hover:text-white transition-all"
          aria-label="Share"
        >
          <Share2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SocialShare;