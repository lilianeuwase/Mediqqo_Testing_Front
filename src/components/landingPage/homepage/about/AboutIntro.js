export default function AboutIntro() {
  return (
    <div className="container flexSB">
      <div className="left rowhome">
        <h2 className="text-3xl font-bold tracking-tight text-orange-400 sm:text-4xl">
          About MEDIQQO
          <br />
        </h2>
        <p className="mt-6 text-xl leading-8 text-black">
          Mediqqo is an electronic medical prescription management system which
          is developped using the Rwandan’s official Ministry of Health's
          National Guideline for management of Non-Communicable Diseases (NCDs)
          <br />
          <br />
          Mediqqo has been tested by randomly selected healthcare professionals
          who practice in referral hospitals, district hospitals, and clinics
          that treat and manage diabetes, and hypertension in Rwanda.
        </p>
      </div>
      {/* <div className="right rowhome">
        <img
          src={require("../../../../images/loginmediqqo.png")}
          alt="App screenshot"
        />
      </div> */}
    </div>
  );
}
