import { teko } from "../layout";
import { Accordion } from "radix-ui";

export default function Page() {
  return (
    <section className="flex flex-col items-center text-center w-90 md:w-180">
      <h2 className={`${teko.className} text-2xl uppercase `}>
        Move with confidence
      </h2>
      <p className="my-2">
        We know that staying active can feel overwhelming when your body is
        navigating pain or injury. What feels right one day might not feel right
        the next, and choosing a suitable workout isn&apos;t always
        straightforward.
      </p>
      <p className="my-2">
        By offering personalised suggestions based on exercise type and
        suitability, you can discover sessions that match your needs and help
        you thrive at your own pace.
      </p>
      <p className="my-2">
        Each workout includes real experiences from the Flex Mills community.
        Explore member profiles, understand what they&apos;re managing day to
        day, and uncover sessions that could support your body in a similar way.
      </p>
      <Accordion.Root type="single" collapsible className="my-2">
        <Accordion.Item value="item-1">
          <Accordion.Trigger
            className={`${teko.className} text-2xl bg-flexmills-black text-flexmills-grey uppercase  px-5 pt-2 pb-1 border-3 border-flexmills-green hover:text-white`}
          >
            A Word from Our Founder
          </Accordion.Trigger>
          <Accordion.Content className="italic mt-4">
            &quot;Flex Mills was born out of my own experience of managing
            hypermobility. Some days my body feels strong, other days it needs
            more care, and choosing workouts that felt safe and genuinely doable
            was a constant challenge. I built Flex Mills to offer the clarity
            and community I always wished I had - a space where we can learn
            from each other and move with confidence.&quot;
            <br />
            <span className="not-italic">Samantha Parkes</span>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
    </section>
  );
}
