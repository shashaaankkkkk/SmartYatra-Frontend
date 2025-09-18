import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bus,
  User,
  Bot,
  Loader2,
  MapPin,
  Clock,
  Ticket,
} from "lucide-react";

const BusChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting message
  useEffect(() => {
    const greetingMessage = {
      id: Date.now(),
      text: "Hello! 👋 How can I help you with your bus booking today? I can assist you with finding routes, checking schedules, and booking tickets.",
      sender: "bot",
      timestamp: new Date().toISOString(),
    };
    setMessages([greetingMessage]);
  }, []);

  // Quick action suggestions
  const quickActions = [
    {
      icon: MapPin,
      text: "Find routes",
      query: "Show me available bus routes",
    },
    {
      icon: Clock,
      text: "Check schedules",
      query: "What buses are running today?",
    },
    { icon: Ticket, text: "My tickets", query: "Show me my booked tickets" },
  ];

  // Send message to API
  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Get JWT token from localStorage (you should set this after login)
      const token = localStorage.getItem("jwt_token") || "YOUR_JWT_TOKEN_HERE";

      const response = await fetch(
        "https://backend.shaslolav.space/api/chat-gemini/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: messageText }),
        },
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: "bot",
        timestamp: new Date().toISOString(),
        dbContext: data.db_context,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);

      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I couldn't process your request. Please check your connection and try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSubmit = () => {
    sendMessage(inputMessage);
  };

  const handleQuickAction = (query) => {
    setInputMessage(query);
    sendMessage(query);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 shadow-sm"
      >
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
            <Bus className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-gray-800">
              Bus Booking Assistant
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Available 24/7 to help with your travel
            </p>
          </div>
        </div>
      </motion.div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col max-w-4xl w-full mx-auto">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-4 md:px-6 space-y-4"
        >
          {/* Quick Actions - Show only if no messages except greeting */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 justify-center mb-4"
            >
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleQuickAction(action.query)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors group"
                >
                  <action.icon className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                  <span className="text-sm text-gray-700 group-hover:text-blue-600">
                    {action.text}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Messages */}
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-2 max-w-[85%] md:max-w-[70%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-blue-500 to-purple-600"
                        : "bg-gradient-to-br from-gray-400 to-gray-600"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`group relative ${message.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`px-4 py-2.5 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                          : message.isError
                            ? "bg-red-50 border border-red-200 text-red-800"
                            : "bg-white border border-gray-200 text-gray-800"
                      } shadow-sm`}
                    >
                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                        {message.text}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <div
                      className={`mt-1 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex justify-start"
            >
              <div className="flex gap-2 max-w-[70%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="px-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.2,
                      }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: 0.4,
                      }}
                      className="w-2 h-2 bg-gray-400 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-t border-gray-200 bg-white/80 backdrop-blur-md px-4 py-3 md:px-6 md:py-4"
        >
          <div className="flex gap-2 md:gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Ask about routes, schedules, or tickets..."
              className="flex-1 px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-400 focus:bg-white transition-all text-sm md:text-base placeholder-gray-400"
              disabled={isLoading || isTyping}
              maxLength={1000}
            />
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!inputMessage.trim() || isLoading || isTyping}
              className={`p-2.5 md:p-3 rounded-xl transition-all ${
                inputMessage.trim() && !isLoading && !isTyping
                  ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white hover:shadow-lg"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading || isTyping ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </div>
          <div className="mt-2 text-xs text-gray-400 text-center">
            Powered by AI • Responses may take a few seconds
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BusChatbot;
