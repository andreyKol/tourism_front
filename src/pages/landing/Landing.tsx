import bg from "../../assets/home-cover.webp";

export const Landing = () => {
  return (
    <div>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "96%",
          margin: "10px auto 0",
          borderRadius: "16px",
          height: "60px",
          background: "#004ccc",
          color: "white",
          padding: "10px 40px",
          boxSizing: "border-box",
        }}
      >
        <p
          style={{
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Туры для молодежи
        </p>
        <button
          onClick={() => (window.location.href = "/sign-in")}
          style={{
            outline: "none",
            border: "none",
            background: "#005fff",
            color: "white",
            borderRadius: "16px",
            padding: "12px",
            cursor: "pointer",
          }}
        >
          Войти / Зарегистрироваться
        </button>
      </header>
      <main>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
            padding: "0 20px",
          }}
        >
          <div>
            <h1
              style={{
                maxWidth: "630px",
                paddingTop: "80px",
                fontSize: "34px",
                color: "rgb(0, 76, 204)",
              }}
            >
              Веб-сервис подбора направлений для молодежного туризма
            </h1>
            <h2>Что вы получите?</h2>
            <ol
              style={{
                maxWidth: "500px",
                paddingLeft: "15px",
              }}
            >
              <option
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  padding: "10px 0",
                  whiteSpace: "wrap",
                }}
              >
                Узнавайте о самых интересных мероприятиях и событиях выбранной
                страны
              </option>
              <option
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  padding: "10px 0",
                  whiteSpace: "wrap",
                }}
              >
                Задавайте вопросы и получайте советы по выбору направления и
                организации путешествий
              </option>
              <option
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  padding: "10px 0",
                  whiteSpace: "wrap",
                }}
              >
                Мы поможем вам подобрать направление, учитывая ваши интересы и
                предпочтения
              </option>
              <option
                style={{
                  fontSize: "18px",
                  fontWeight: "400",
                  padding: "10px 0",
                  whiteSpace: "wrap",
                }}
              >
                Получайте подробную информацию о культуре,
                достопримечательностях, кухне и традициях страны
              </option>
            </ol>
          </div>
          <img
            src={bg}
            style={{
              maxWidth: "800px",
              height: "700px",
              objectFit: "cover",
              width: "46%",
            }}
          />
        </section>
        <section
          style={{
            padding: "0 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "500px",
            margin: "44px auto 0",
          }}
        >
          <h2
            style={{
              marginBottom: 0,
              fontSize: "20px",
              maxWidth: "800px",
            }}
          >
            Хотите круто провести время?
          </h2>
          <p
            style={{
              fontSize: "20px",
              maxWidth: "800px",
            }}
          >
            Тогда планируйте ваше путешествие с нами и вы получите незабываемые
            впечатления!
          </p>
          <button
            onClick={() => (window.location.href = "/sign-in")}
            style={{
              outline: "none",
              border: "none",
              background: "#005fff",
              color: "white",
              borderRadius: "16px",
              padding: "12px",
              cursor: "pointer",
              margin: "0 auto",
            }}
          >
            Отправиться в путешествие
          </button>
        </section>
      </main>
    </div>
  );
};
