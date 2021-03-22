import React from 'react';

const UserList = (props) => {
	return (
		<>
			{props.users.map((user, index) => (
				
				<div className='image-container d-flex justify-content-start m-3' key={user._id}>
					<img src={user.Image} alt='user'></img>
					<div
						className='overlay d-flex align-items-center justify-content-center'
					>
					</div>
				</div>
			))}
		</>
	);
};

export default UserList;