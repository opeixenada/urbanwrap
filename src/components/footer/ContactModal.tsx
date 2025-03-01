import { Modal } from "@/components/footer/Modal";

export function ContactModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="Contact">
      <p className="text-gray-700 dark:text-gray-300">
        <a
          href="mailto:hello@raspberry.blue"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          hello@raspberry.blue
        </a>
      </p>
    </Modal>
  );
}
