import React, { useState } from 'react';
import { X, HelpCircle, CheckCircle2, Send } from 'lucide-react';
import { FeedbackReason } from '../types';

interface UserFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFeedback: (reason: FeedbackReason, note?: string) => void;
}

const REASONS: FeedbackReason[] = [
  'Price',
  'Shipping',
  'Delivery availability',
  'Payment',
  'Just browsing',
  'Not ready to buy',
  'Other',
];

export const UserFeedbackModal: React.FC<UserFeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmitFeedback,
}) => {
  if (!isOpen) return null;

  const [selectedReason, setSelectedReason] = useState<FeedbackReason | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    onSubmitFeedback(selectedReason, comment);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#DADCE0]">
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] transition-colors"
          title="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#E6F4EA] text-[#188038] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#202124]">Thank you for sharing your thoughts!</h3>
            <p className="text-xs text-[#5F6368] leading-relaxed max-w-sm mx-auto">
              We really appreciate you taking a moment to help us improve the Google Merchandise shopping experience.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-9 h-9 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center shrink-0 mt-0.5">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#202124] leading-snug">
                  How can we make this better for you?
                </h3>
                <p className="text-xs text-[#5F6368] mt-0.5">
                  Let us know what would make your shopping experience more seamless.
                </p>
              </div>
            </div>

            {/* Radio / Option Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {REASONS.map((reason) => (
                <button
                  type="button"
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  className={`px-3 py-2.5 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                    selectedReason === reason
                      ? 'border-[#1A73E8] bg-[#E8F0FE] text-[#1A73E8] font-semibold'
                      : 'border-[#DADCE0] bg-white text-[#3C4043] hover:bg-[#F8F9FA]'
                  }`}
                >
                  {reason}
                </button>
              ))}
            </div>

            {/* Optional Comment Input */}
            <div>
              <label className="block text-[11px] font-medium text-[#5F6368] mb-1">
                Anything else you'd like to share? (optional):
              </label>
              <textarea
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="e.g. Would love to see additional sizes, festive colors, or gift packaging options..."
                className="w-full text-xs p-2.5 border border-[#DADCE0] rounded-xl focus:border-[#1A73E8] focus:outline-hidden"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#F1F3F4]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-lg transition-colors cursor-pointer"
              >
                Maybe later
              </button>
              <button
                type="submit"
                disabled={!selectedReason}
                className="px-5 py-2 text-xs font-semibold bg-[#1A73E8] hover:bg-[#1765CC] disabled:opacity-50 text-white rounded-lg transition-colors flex items-center space-x-1.5 cursor-pointer"
              >
                <span>Send Feedback</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
