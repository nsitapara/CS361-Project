import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {fetchGroupData} from "./FetchData";

import PanelToolTip from "./PanelToolTip";
import {EditGroupDialog} from "@/components/EditGroupDialog";
import {DeleteGroupDialog} from "@/components/DeleteGroupDialog";
import {AddGroupDialog} from "@/components/AddGroupDialog";

export default async function GroupsPanels() {
    const data = await fetchGroupData();
    return (
        <div>
            <div>
            <h2 className="place-items-center place-content-center text-emerald-700 text-xl flex ">
                Group Management Panel
                <PanelToolTip
                    message={
                        "This panel allows you quickly edit group details and delete groups"
                    }
                />
            </h2>
                <div className={"flex place-content-end"}>
                    <AddGroupDialog/>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Group ID</TableHead>
                        <TableHead>Group Name</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Edit</TableHead>
                        <TableHead className="text-right">Delete</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((record) => (
                        <TableRow key={record.group_id}>
                            <TableCell className="font-medium">{record.group_id}</TableCell>
                            <TableCell>{record.group_name}</TableCell>
                            <TableCell>{record.members?.join(",")}</TableCell>
                            <TableCell>
                                <EditGroupDialog
                                    group_id={record.group_id}
                                    group_name={record.group_name}
                                    group_members={record.members || []}
                                />
                            </TableCell>
                            <TableCell>
                                <DeleteGroupDialog
                                    group_id={record.group_id}
                                    group_name={record.group_name}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
