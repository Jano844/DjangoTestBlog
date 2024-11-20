# chat/views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Group
from .forms import ChatForm

# @login_required
# def chat_view(request):
#     if request.method == 'POST':
#         form = ChatForm(request.POST)
#         if form.is_valid():
#             chat_message = form.save(commit=False)
#             chat_message.author = request.user
#             chat_message.save()
#             return redirect('chat')  # Replace 'chat' with the name of your URL pattern
#     else:
#         form = ChatForm()

#     # Fetch all chat messages ordered by date
#     messages = Chat.objects.all().order_by('-date_posted')[:100]
#     messages = list(messages)
#     messages.reverse()
#     return render(request, 'chat/chat.html', {'form': form, 'messages': messages})

@login_required
def show_all_chats(request):
    user = request.user
    chat_rooms = user.chat_groups.all().order_by('date_created')
    return render(request, 'chat/allChats.html', {'rooms':chat_rooms})

def room_detail(request, room_id):
    group = Group.objects.get(id=room_id)
    test = group.messages.all().order_by('-date_posted')

    # print(test.group.groupName)
    return render(request, 'chat/ChatRoom.html', {'messages': test})
