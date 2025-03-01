import { Modal } from "@/components/footer/Modal";

export function PrivacyModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Privacy & Cookies">
      <p className="text-gray-700 dark:text-gray-300">
        We don&#39;t collect any information, we don&#39;t use cookies, and we completely forget
        about you after you close or refresh the page. Peace!
      </p>
    </Modal>
  );
}
