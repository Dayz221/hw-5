import Text from "components/Text";

const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '' }}>
            <Text align="center" view="p-32" color="primary">Page Not Found</Text>
            <Text align="center" view="p-20" color="secondary">The page you are looking for does not exist.</Text>
        </div>
    );
}

export default NotFound;