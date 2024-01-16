// TagsInput.js
import React, { useState, useEffect } from 'react';
import './home.css';
import userimg from '../../assets/user.webp'
const TagsInput = (props) => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // For demonstration, using a static array of users
    const usersData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', image: userimg },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', image: userimg },
      // Add more users as needed
    ];

    setAllUsers(usersData);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    filterUsers(e.target.value);
  };

  const filterUsers = (input) => {
    setFilteredUsers(
      allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(input.toLowerCase()) ||
          user.email.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const handleUserSelect = (userId) => {
    const selectedUser = allUsers.find((user) => user.id === userId);

    if (selectedUser && !tags.some((tag) => tag.id === userId)) {
      setTags([...tags, selectedUser]);
      props.selectedTags([...tags, selectedUser]);
      setInputValue('');
      setSelectedUserId(null);
    }
  };

  const handleRemoveTag = (userId) => {
    const updatedTags = tags.filter((tag) => tag.id !== userId);
    setTags(updatedTags);
  };

  return (
<>
    <div className="heading">Pick users</div>
    <div className="tags-input">

       
      <ul id="tags">
        {tags.map((tag) => (
          <li key={tag.id} className="tag">
            <img src={tag.image} alt={tag.name} className="tag-image" />
            <span className="tag-title">{tag.name}</span>
            <span
              className="tag-close-icon"
              onClick={() => handleRemoveTag(tag.id)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add user"
      />
      {filteredUsers.length > 0 && (
        <div className="user-dropdown">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`user-option ${selectedUserId === user.id ? 'selected' : ''}`}
              onClick={() => handleUserSelect(user.id)}
            >
              <img src={user.image} alt={user.name} className="user-image" />
              <div className='userid'>
                <p>{user.name}</p>
                <p className='para'>{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default TagsInput;
