import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import adminImage from "../../public/images/admin.png";

export function AdminCard({ handleRevoke, admin }) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image src={adminImage.src} fit="contain" height={160} alt="Norway" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{admin.name}</Text>
        <Badge color={admin.access ? "green" : "red"} variant="light">
          {admin.access ? "Admin" : "Deleted"}
        </Badge>
      </Group>

      {/* <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text> */}

      <Button
        onClick={() => handleRevoke()}
        variant="light"
        color="red"
        fullWidth
        disabled={!admin.access}
        mt="md"
        radius="md"
      >
        Revoke Access
      </Button>
    </Card>
  );
}
