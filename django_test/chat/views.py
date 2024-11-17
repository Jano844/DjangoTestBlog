# chat/views.py
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import Chat
from .forms import ChatForm

@login_required
def chat_view(request):
    if request.method == 'POST':
        form = ChatForm(request.POST)
        if form.is_valid():
            chat_message = form.save(commit=False)
            chat_message.author = request.user
            chat_message.save()
            return redirect('chat')  # Replace 'chat' with the name of your URL pattern
    else:
        form = ChatForm()

    # Fetch all chat messages ordered by date
    messages = Chat.objects.all().order_by('-date_posted')[:100]
    messages = list(messages)
    messages.reverse()
    return render(request, 'chat/chat.html', {'form': form, 'messages': messages})
