import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserListItem from '../../components/user/UserListItem';
import LoadingComponent from '../../utils/LoadingComponent';

function UsersList() {
  const dispatch = useDispatch();

  const users = useSelector((state) => state?.users);
  const { usersList, appErr, serverErr, loading, block, unblock } = users;

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [block, unblock]);

  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {loading ? (
          <LoadingComponent />
        ) : appErr || serverErr ? (
          <h3 className="text-yellow-600 text-center text-lg">
            {serverErr} {appErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map((user) => (
            <>
              <UserListItem user={user} />
            </>
          ))
        )}
      </section>
    </>
  );
}

export default UsersList;
