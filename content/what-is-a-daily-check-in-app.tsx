import Link from "next/link";

const linkClass = "font-medium text-[#006039] underline decoration-[#006039]/25 underline-offset-4 hover:decoration-[#006039]";

export function WhatIsADailyCheckInApp() {
  return (
    <>
      <p>
        A daily check-in app is a simple way to confirm you are okay once a day.
        If those check-ins stop, the app notifies an emergency contact — so
        silence is no longer invisible.
      </p>
      <p>
        That is the whole idea. You are not pressing a panic button. You are not
        sharing your location on a map. You are leaving a small, regular signal
        that you are alive and well. When the signal does not arrive, someone
        you chose finds out.
      </p>
      <p>
        People also call this a wellness check app. The names are used
        interchangeably. Both describe the same habit: a scheduled “I am okay,”
        and an automatic alert if that habit breaks.
      </p>
      <p>
        Search results mix these tools with medical alert pendants, GPS family
        locators, and 24/7 monitoring centers. Those products solve different
        minutes of a crisis. A daily check-in app solves the days in between,
        when nothing is obviously wrong until too much time has already passed.
      </p>

      <h2>How a daily check-in app works</h2>
      <p>
        Most daily check-in apps follow the same three steps, whether they live
        on a phone, in a browser, or as a text message you reply to.
      </p>
      <ol>
        <li>
          You add a trusted person as an emergency contact — often by email or
          phone number. They should not need their own account for the alert to
          arrive.
        </li>
        <li>
          Once a day, you check in. That is usually one tap on a button. The tap
          means: I am here, and I am okay.
        </li>
        <li>
          If you miss the check-in for longer than the app allows, your contact
          is notified automatically. You do not have to be able to call for help
          in that moment. The missed check-in is the signal.
        </li>
      </ol>
      <p>
        Some apps remind you before the deadline. Some wait minutes. Some wait
        hours. A few, including{" "}
        <Link href="/" className={linkClass}>
          PULS
        </Link>
        , wait two quiet days before sending the email, so a forgotten tap on a
        busy evening does not become a false alarm.
      </p>

      <h2>Daily check-in app vs medical alert</h2>
      <p>
        A medical alert pendant is built for the second you can press a button:
        a fall, chest pain, “I need help now.” A call center or emergency
        service is the point.
      </p>
      <p>
        A daily check-in app is built for a different fear: something happens
        and nobody notices for days. You may not be able to reach a button. You
        may not be wearing the pendant. The check-in is useful precisely when
        you cannot act.
      </p>
      <p>
        They can sit next to each other. A wearable covers the emergency you can
        still report. A daily check-in app covers the days when there is no
        report at all. If your main worry is going unnoticed — not summoning an
        ambulance from your wrist — start with the check-in.
      </p>

      <h2>Daily check-in app vs GPS tracking</h2>
      <p>
        Family-locator apps answer “where is this person right now?” That can
        feel like safety. It is also surveillance. Many people who live alone
        will refuse it, and they are right to.
      </p>
      <p>
        A daily check-in app only needs to know whether the okay-signal arrived.
        Good ones do not need your GPS trail. Contacts hear from the system when
        a check-in is missed — not every time you go to the shop.
      </p>

      <h2>Who a daily check-in app is for</h2>
      <p>
        Marketing often frames this as a tool for older adults. The problem is
        broader. Tens of millions of people in Europe and the United States live
        alone. Remote work, new cities, and quiet weeks between family calls all
        create the same gap: if something goes wrong at home, it can take a long
        time before anyone thinks to look.
      </p>
      <p>A daily check-in app tends to fit:</p>
      <ul>
        <li>Anyone living alone who wants a trusted person to notice silence</li>
        <li>
          Adult children who do not want to phone every morning, but also do not
          want to guess
        </li>
        <li>People aging solo, with or without family nearby</li>
        <li>
          Pet owners who worry about what happens at home if they cannot get up
        </li>
      </ul>
      <p>
        It is a poor fit if you need fall detection, a dispatcher who can call
        911, or live location. Those are different products.
      </p>
      <p>
        It also helps to be honest about who will actually use it. The person
        living alone has to tap. If they will not open an app every day, a
        product that depends on a widget, a text reply, or a very large button
        may last longer than a buried menu. The emergency contact has to be
        someone who will pick up the phone when an alert arrives — a neighbour
        with a spare key often beats a relative three time zones away.
      </p>

      <h2>What happens if you miss a daily check-in</h2>
      <p>
        This is the question that matters, and apps answer it differently. Read
        it before you pick one.
      </p>
      <p>
        Same-day alerts (common in senior-focused apps) notify contacts minutes
        or hours after a missed tap. That is faster. It also creates more false
        alarms when someone sleeps in, leaves the phone in another room, or
        forgets.
      </p>
      <p>
        A slower window — two missed days, then an email — trades speed for
        fewer panics. Someone who is actually unreachable for days is still
        found. Someone who skipped a single busy day is not.
      </p>
      <p>
        Neither design calls emergency services for you. The contact still has
        to phone, knock, or decide what to do next. Say that out loud when you
        set the app up, so the person on the other end knows what an alert
        means.
      </p>
      <p>
        A simple plan for the contact is enough: try calling. If there is no
        answer, try a neighbour or a building manager. If that fails, decide in
        advance whether a wellness check from local services is the next step.
        The daily check-in app only starts that conversation. It does not finish
        it.
      </p>

      <h2>What to look for in a daily check-in app</h2>
      <ul>
        <li>
          <strong>Contacts do not need the app.</strong> An email or text to an
          ordinary inbox is enough.
        </li>
        <li>
          <strong>The check-in is one action.</strong> If it takes a login maze
          every morning, people stop.
        </li>
        <li>
          <strong>You know the delay.</strong> Minutes, hours, or days — it
          should be written down, not implied.
        </li>
        <li>
          <strong>Privacy matches the promise.</strong> No account and data on
          your device is a different product from a cloud dashboard of your
          family.
        </li>
        <li>
          <strong>It is not pretending to be 911.</strong> Honesty here is a
          feature.
        </li>
      </ul>

      <h2>A daily check-in app without an account</h2>
      <p>
        PULS is a daily check-in app in the browser. You add a name and an
        emergency email, then tap the circle once a day. There is no account.
        The details stay on your device.
      </p>
      <p>
        If the button is not pressed two days in a row, PULS emails that
        contact. The point is not to escalate every forgotten morning. The point
        is that two days of silence should not stay private.
      </p>
      <p>
        <Link href="/app" className={linkClass}>
          Open the app
        </Link>{" "}
        if you want that version: one screen, one tap, one person who should
        know.
      </p>

      <h2>How to set up a daily check-in today</h2>
      <p>
        You do not need equipment. You need one person who has agreed to be
        contacted, and a tool you will actually open.
      </p>
      <ol>
        <li>
          Ask the contact first. An alert is a request for their time. They
          should know the delay (same day, or two quiet days) and what you want
          them to do.
        </li>
        <li>
          Pick a check-in that fits an existing habit — morning coffee, or the
          last thing before bed — so the tap is not a new chore.
        </li>
        <li>
          Do one test if the product allows it, or tell the contact you are
          turning it on, so the first real email is not a shock.
        </li>
      </ol>
      <p>
        If you want the smallest version of this,{" "}
        <Link href="/" className={linkClass}>
          PULS
        </Link>{" "}
        is one screen in the browser: your name, an emergency email, and a
        check-in circle. No store listing, no account, nothing to wear.
      </p>

      <h2>Daily check-in app FAQs</h2>

      <h3>Is a wellness check app the same as a daily check-in app?</h3>
      <p>
        Yes. “Wellness check app” is often used when the reader is thinking
        about an older parent. “Daily check-in app” is the more neutral name for
        the same loop: confirm you are okay, alert someone if you do not.
      </p>

      <h3>Do emergency contacts need to install anything?</h3>
      <p>
        They should not. If your contact has to download an app before they can
        be warned, the chain is weaker. Email or SMS to a normal phone is the
        useful design.
      </p>

      <h3>Is a daily check-in app a replacement for 911?</h3>
      <p>
        No. If you can call emergency services, do that. A daily check-in app
        helps when you cannot call, and when the risk is time passing without
        anyone noticing.
      </p>

      <h3>What if I simply forget to check in?</h3>
      <p>
        That is why the delay exists. Choose an app whose window matches how you
        live. If you want almost-immediate notice, pick a same-day product. If
        you want fewer false alarms, pick a longer quiet period — like two missed
        days — and tell your contact that in advance.
      </p>
    </>
  );
}
