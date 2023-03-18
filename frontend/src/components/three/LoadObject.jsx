import { useEffect } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { useState } from "react";

export default function UseLoadObject(props) {
  const [obj, loadObj] = useState(props);
  const loader = new OBJLoader();
  loadObj(obj, loader.parse(props));
  return obj;
}

import { useState, useEffect } from "react";

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
