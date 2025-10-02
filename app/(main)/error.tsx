'use client';
import Text from "components/Text";

const ErrorContent = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Text align="center" view="p-32" color="primary">Error =(</Text>
            <Text align="center" view="p-20" color="secondary">Something went wrong. Please try again later.</Text>
        </div>
    );
}

export default ErrorContent;