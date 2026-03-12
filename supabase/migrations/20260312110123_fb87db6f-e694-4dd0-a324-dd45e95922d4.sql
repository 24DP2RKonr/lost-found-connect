
CREATE POLICY "Users can update read status in own conversations"
ON public.messages
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM conversations c
    WHERE c.id = messages.conversation_id
    AND (c.sender_id = auth.uid() OR c.receiver_id = auth.uid())
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM conversations c
    WHERE c.id = messages.conversation_id
    AND (c.sender_id = auth.uid() OR c.receiver_id = auth.uid())
  )
);
