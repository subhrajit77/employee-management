"use client";
import { api } from "@/app/api";
import { use, useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { EmployeePaginator, EmployeeRow } from "../.";

import { Text, Heading, Box, Center, Container } from "@chakra-ui/react";
export default function EmployeeTable() {
    const [page, setPage] = useState(1);
    const [employees, setEmployees] = useState([]);

    const showEmployees = async () => {
        api.get("employees/")
            .then((res) => {
                const { data } = res;
                setEmployees(data.results);
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                } else if (err.request) {
                    console.log(err.request);
                } else {
                    console.log("Error", err.message);
                }
            });
    };
    const deleteEmploy = async (id: number) => {
        api.delete(`employees/${id}/`)
            .then((res) => {
                showEmployees();
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.response.data);
                } else {
                    console.log("Error", err);
                }
            });
    };
    const handleDelete = (id: number) => {
        deleteEmploy(id);
    };
    useEffect(() => {
        showEmployees();
    }, []);

    return (
        <>
            <Container>
                <Heading as="h1" size="lg" textAlign={"center"}>
                    Employee Table
                </Heading>
                <Text fontSize="lg" textAlign={"center"}>
                    This is a table of all employees in the company
                </Text>
            </Container>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Employee ID</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>Position</Th>
                        <Th>Department</Th>
                        <Th>Salary</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, num) => (
                            <EmployeeRow
                                key={num}
                                employee={employee}
                                deleteEmployee={handleDelete}
                            />
                        ))
                    ) : (
                        <Tr>
                            <Td colSpan={7} textAlign={"center"}>
                                No available employees
                            </Td>
                        </Tr>
                    )}
                </Tbody>
            </Table>
            <EmployeePaginator />
        </>
    );
}
