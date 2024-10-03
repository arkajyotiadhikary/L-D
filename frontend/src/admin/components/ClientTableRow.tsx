import { Tr, Td, Menu, MenuButton, MenuItem, MenuList, Button, Badge } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface ClientTableRowProps {
      name: string;
      manager: string;
      email: string;
      trainingStatus: string;
      creditStatus: string;
}

const ClientTableRow: React.FC<ClientTableRowProps> = ({
      name,
      manager,
      email,
      trainingStatus,
      creditStatus,
}) => {
      return (
            <Tr>
                  <Td>{name}</Td>
                  <Td>{manager}</Td>
                  <Td>{email}</Td>
                  <Td>
                        <Badge colorScheme={trainingStatus === "Completed" ? "green" : "yellow"}>
                              {trainingStatus}
                        </Badge>
                  </Td>
                  <Td>{creditStatus}</Td>
                  <Td>
                        <Menu>
                              <MenuButton
                                    as={Button}
                                    rightIcon={<FontAwesomeIcon icon={faEllipsisV} />}
                              >
                                    Actions
                              </MenuButton>
                              <MenuList>
                                    <MenuItem icon={<FontAwesomeIcon icon={faEdit} />}>
                                          Edit
                                    </MenuItem>
                                    <MenuItem icon={<FontAwesomeIcon icon={faTrash} />}>
                                          Delete
                                    </MenuItem>
                                    <MenuItem>Upgrade Credits</MenuItem>
                              </MenuList>
                        </Menu>
                  </Td>
            </Tr>
      );
};

export default ClientTableRow;
