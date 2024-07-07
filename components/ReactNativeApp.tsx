import React, { useState, ChangeEvent } from "react";
import {
    FlatList,
    TextInput,
    Pressable,
    StyleSheet,
    Text,
    View,
    Button,
} from "react-native";

interface RupeeBoxProps {
    onChange: (value: number) => void;
    defaultValue?: string;
}

const RupeeBox: React.FC<RupeeBoxProps> = ({ onChange, defaultValue = "" }) => {
    const [text, onChangeText] = useState(defaultValue);

    const onBlurCallback = () => {
        if (text) {
            const parsedFloat = parseFloat(text);
            if (parsedFloat) {
                onChange(parsedFloat);
            }
        }
    };

    return (
        <TextInput
            style={ [styles.input, styles.full] }
            keyboardType="numeric"
            onChangeText={onChangeText}
            onBlur={onBlurCallback}
            value={text}
        />
    );
};

interface DeductBoxProps {
    userName: string;
    userId: number;
    rupeeCount: number;
    onChange: (userId: number, userName: string, value: number) => void;
}

const DeductBox: React.FC<DeductBoxProps> = ({ userName, userId, rupeeCount, onChange }) => {
    const onChangeCallback = (value: number) => {
        onChange(userId, userName, value);
    };

    return (
        <>
            <Text>
                {userName} - Rupees: {rupeeCount} - Deduct
            </Text>
            <RupeeBox onChange={onChangeCallback} />
        </>
    );
};

interface Debt {
    id: number;
    name: string;
    amount: number;
    forecastAmount: number;
    date: string;
}

interface DebtBoxProps {
    userName: string;
    userId: number;
    debt: Debt;
    onDeduct: (userId: number, userName: string, amount: number) => void;
    onDelete: (id: number) => void;
}

const DebtBox: React.FC<DebtBoxProps> = ({ userName, userId, debt, onDeduct, onDelete }) => {
    const onDeductCallback = () => {
        onDeduct(userId, userName, debt.amount);
        onDelete(debt.id);
    };
    const onDeleteCallback = () => {
        onDelete(debt.id);
    };

    return (
        <Text>
            <Button title="x" onPress={onDeleteCallback} />
            {debt.name}
            <Button title={`-${debt.amount}`} onPress={onDeductCallback} />=
            {debt.forecastAmount} on {debt.date}~
        </Text>
    );
};

interface Audit {
    id: number;
    name: string;
    amount: number;
    forecastAmount: number;
    date: string;
}

interface AuditBoxProps {
    audit: Audit;
}

const AuditBox: React.FC<AuditBoxProps> = ({ audit }) => {
    return (
        <Text>
            {audit.name} -{audit.forecastAmount} on {audit.date}
        </Text>
    );
};

interface NewDebtBoxProps {
    userName: string;
    userId: number;
    onSubmit: (userId: number, userName: string, debt: Debt) => void;
}

const NewDebtBox: React.FC<NewDebtBoxProps> = ({ userName, userId, onSubmit }) => {
    const [debt, setDebt] = useState<Debt>({
        id: 0,
        name: "",
        amount: 0,
        forecastAmount: 0,
        date: "2024-06-01",
    });

    const onSubmitCallback = () => {
        onSubmit(userId, userName, debt);
    };

    const handleInputChange = (name: string, value: string | number) => {
        setDebt((prevDebt) => ({
            ...prevDebt,
            [name]: value,
        }));
    };

    return (
        <View>
            <Text>
                <TextInput
                    style={styles.input}
                    value={debt.name}
                    placeholder="Name"
                    onChangeText={(value) => handleInputChange("name", value)}
                />
                <Text>-</Text>
                <TextInput
                    style={styles.input}
                    value={debt.amount.toString()}
                    placeholder="Amount"
                    keyboardType="numeric"
                    onChangeText={(value) =>
                        handleInputChange("amount", parseFloat(value))
                    }
                />
                <Text> on </Text>
                <TextInput
                    style={styles.input}
                    value={debt.date}
                    placeholder="Date"
                    onChangeText={(value) => handleInputChange("date", value)}
                />
                <Button title="+" onPress={onSubmitCallback} />
            </Text>
        </View>
    );
};

interface SplitBoxProps {
    onChange: (value: number) => void;
}

const SplitBox: React.FC<SplitBoxProps> = ({ onChange }) => {
    const onChangeCallback = (value: number) => {
        onChange(value);
    };

    return (
        <View>
            <Text>Split</Text>
            <RupeeBox onChange={onChangeCallback} />
        </View>
    );
};

interface PayBoxProps {
    onChange: (value: number) => void;
    onPress: (userIdList: number[], value: number) => void;
    userIdList: number[];
    defaultValue: string;
}

const PayBox: React.FC<PayBoxProps> = ({ onChange, onPress, userIdList, defaultValue }) => {
    const [payAmount, setPayAmount] = useState(0);
    const onChangeCallback = (value: number) => {
        setPayAmount(value);
        onChange(value);
    };
    const onPressCallback = () => {
        onPress(userIdList, payAmount);
    };

    return (
        <View>
            <Text>Pay Amount</Text>
            <RupeeBox onChange={onChangeCallback} defaultValue={defaultValue} />
            <Pressable onPress={onPressCallback} style={buttonStyles.button}>
                <Text style={buttonStyles.text}>Allowance</Text>
            </Pressable>
        </View>
    );
};

interface User {
    userName: string;
    userId: number;
    rupeeAmount: number;
    auditList: Audit[];
    debtList: Debt[];
}

interface Settings {
    defaultPay: number;
}

export const RupeeGinkoApp: React.FC = () => {
    return (
        <App/>
    );
}

const App: React.FC = () => {
    const [message, setMessage] = useState("");

    const userList: User[] = [
        {
            userName: "Sean",
            userId: 0,
            rupeeAmount: 13,
            auditList: [
                {
                    id: 9,
                    name: "Thing 1",
                    amount: 1, forecastAmount: 0,
                    date: "2024-07-04",
                },
                {
                    id: 10,
                    name: "Thing 2",
                    amount: 2, forecastAmount: 0,
                    date: "2024-07-05",
                },
                {
                    id: 11,
                    name: "Thing 3",
                    amount: 3, forecastAmount: 0,
                    date: "2024-07-06",
                },
            ],
            debtList: [
                {
                    id: 0,
                    name: "Thing 1",
                    amount: 1,
                    forecastAmount: 49,
                    date: "2024-07-04",
                },
                {
                    id: 1,
                    name: "Thing 2",
                    amount: 2,
                    forecastAmount: 47,
                    date: "2024-07-05",
                },
                {
                    id: 2,
                    name: "Thing 3",
                    amount: 3,
                    forecastAmount: 44,
                    date: "2024-07-06",
                },
            ],
        },
        {
            userName: "AD",
            userId: 1,
            rupeeAmount: -8,
            auditList: [
                {
                    id: 12,
                    name: "Thing 1",
                    amount: 4, forecastAmount: 0,
                    date: "2024-07-04",
                },
                {
                    id: 13,
                    name: "Thing 2",
                    amount: 5, forecastAmount: 0,
                    date: "2024-07-05",
                },
                {
                    id: 14,
                    name: "Thing 3",
                    amount: 6, forecastAmount: 0,
                    date: "2024-07-06",
                },
            ],
            debtList: [
                {
                    id: 3,
                    name: "Train Ticket",
                    amount: 20,
                    forecastAmount: 78,
                    date: "2024-07-12",
                },
                {
                    id: 4,
                    name: "Otakon Hotel",
                    amount: 232,
                    forecastAmount: -83,
                    date: "2024-07-30",
                },
                {
                    id: 5,
                    name: "Thing C",
                    amount: 33,
                    forecastAmount: 34,
                    date: "2024-07-09",
                },
            ],
        },
    ];

    const settings: Settings = {
        defaultPay: 150,
    };

    const userIdList = userList.map((u) => u.userId);

    function deductCallback(userId: number, userName: string, amount: number) {
        setMessage(`Deducted ${amount} for ${userName}`);
        console.log(`Sent Deduct ${amount} for ${userId} to server.`);
    }

    function splitCallback(amount: number) {
        setMessage(`Split ${amount}`);
        console.log(`Sent Split ${amount} to server.`);
    }

    function deleteCallback(id: number) {
        setMessage(`Deleted Debt ${id}`);
        console.log(`Sent DeleteDebt ${id} to server.`);
    }

    function debtSubmit(userId: number, userName: string, debt: Debt) {
        setMessage(`Added Debt ${debt.amount} on ${debt.date} for ${userName}`);
        console.log(`Sent AddDebt ${JSON.stringify(debt)} for ${userId} to server.`);
    }

    function payCallback(userIdList: number[], amount: number) {
        setMessage(`Added Pay ${amount}`);
        console.log(`Sent Pay ${amount} for ${JSON.stringify(userIdList)} to server.`);
    }

    function setPayCallback(amount: number) {
        setMessage(`Set Pay to ${amount}`);
        console.log(`Sent SetPay to ${amount} to server.`);
    }

    return (
        <View style={styles.app}>
            <Text>{message}</Text>

            <FlatList
                data={userList}
                style={styles.full}
                renderItem={({ item: user }) => (
                    <DeductBox
                        userName={user.userName}
                        userId={user.userId}
                        rupeeCount={user.rupeeAmount}
                        onChange={deductCallback}
                    />
                )}
                keyExtractor={(user) => user.userId.toString()}
            />

            <SplitBox onChange={splitCallback} />

            <FlatList
                data={userList}
                style={styles.full}
                renderItem={({ item: user }) => (
                    <View style={styles.half}>
                        <Text>{user.userName}</Text>
                        <FlatList
                            data={user.debtList}
                            renderItem={({ item: debt }) => (
                                <DebtBox
                                    userName={user.userName}
                                    userId={user.userId}
                                    debt={debt}
                                    onDeduct={deductCallback}
                                    onDelete={deleteCallback}
                                />
                            )}
                            keyExtractor={(debt) => debt.id.toString()}
                        />

                        <NewDebtBox
                            userName={user.userName}
                            userId={user.userId}
                            onSubmit={debtSubmit}
                        />
                    </View>
                )}
                keyExtractor={(user) => user.userId.toString()}
            />

            <PayBox
                onChange={setPayCallback}
                onPress={payCallback}
                userIdList={userIdList}
                defaultValue={settings.defaultPay.toString()}
            />

            <FlatList
                data={userList}
                renderItem={({ item: user }) => (
                    <View>
                        <Text>{user.userName}</Text>
                        <FlatList
                            data={user.auditList}
                            renderItem={({ item: audit }) => <AuditBox audit={audit} />}
                            keyExtractor={(audit) => audit.id.toString()}
                        />
                    </View>
                )}
                keyExtractor={(user) => user.userId.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({  
    app: {
        marginHorizontal: "auto",
        maxWidth: 500,
        backgroundColor: "white",
    },
    header: {
        padding: 20,
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
    },
    text: {
        textAlign: "center",
    },
    link: {
        color: "#1B95E0",
    },
    code: {
        fontFamily: "monospace, monospace",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    full: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    half: {
        flex: 6,
    }
});

const buttonStyles = StyleSheet.create({
    button: {
        backgroundColor: "#2196F3",
        borderRadius: 2,
    },
    text: {
        color: "#fff",
        fontWeight: "500",
        padding: 8,
        textAlign: "center",
        textTransform: "uppercase",
    },
});

export default App;
