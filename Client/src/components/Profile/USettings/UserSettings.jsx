import React from "react";
import useLogout from "../../../hooks/useLogout";
import { Close, ChangeEmail, ChangePassword, DeleteAccount } from "./UserOptions";
import { Logout } from "./Logout";

const UserSettings = ({ user, onClose }) => {

	const { logout } = useLogout();
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-white/50 z-[9999]">
			<div className="bg-black p-6 rounded-lg w-96 h-96">
				<h2 className="text-lg font-bold mb-4 tcolor">Opcions </h2>
				<div className="mt-10 flex flex-col gap-7">
					<Close onClose={onClose}
					/>
					<Logout/>
					<ChangeEmail/>
					<ChangePassword/>
					<DeleteAccount/>
				</div>
			</div>
		</div>);
};

export default UserSettings;
