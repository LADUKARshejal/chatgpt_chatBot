import Conversation from "../models/conversation.js";
import * as chatgptService from "../service/chatgptService.js";

export const newConversation = async (req, res, next) => {
  try {

    const prompt = req.body.prompt;

    const messages = [
      { role: "user", content: prompt }
    ];

    const aiResponse = await chatgptService.generateContent(messages);

    messages.push({
      role: "assistant",
      content: aiResponse
    });

    const title = await chatgptService.generateTitle(messages);

    const conversation = new Conversation({
      title,
      messages
    });

    await conversation.save();

    res.status(201).json(conversation);

  } catch (err) {
    next(err);
  }
};

export const continueConversation = async (req, res, next) => {
  try {

    const conversationId = req.params.id;
    const prompt = req.body.prompt;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    conversation.messages.push({
      role: "user",
      content: prompt
    });

    const aiMessages = conversation.messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    const aiResponse = await chatgptService.generateContent(aiMessages);

    conversation.messages.push({
      role: "assistant",
      content: aiResponse
    });

    await conversation.save();

    res.json(conversation);

  } catch (err) {
    next(err);
  }
};