<template>
  <div class="enquire-page">
    <section class="enquire-layout">
      <div class="enquire-image">
        <img src="/images/Web-banners/Enquire_Now.jpg" alt="EXEED" />
      </div>
      <div class="enquire-form-wrapper">
        <h1 class="form-heading">Enquire Now</h1>
        <form class="enquire-form" @submit.prevent="onSubmit">
          <div class="form-row">
            <div class="form-group">
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                required
                placeholder="First Name"
              />
            </div>
            <div class="form-group">
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                required
                placeholder="Last Name"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Email"
              />
            </div>
            <div class="form-group">
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <select id="enquiryType" v-model="form.enquiryType" required>
                <option value="" disabled>Enquiry Type</option>
                <option value="sales">Sales Enquiry</option>
                <option value="test-drive">Test Drive</option>
                <option value="service">Service & Maintenance</option>
                <option value="general">General Enquiry</option>
              </select>
            </div>
          </div>

          <div class="marketing-section">
            <h3 class="marketing-title">MARKETING PREFERENCES</h3>
            <p class="marketing-desc">
              To ensure you are kept up to date with Adamas Motors &amp; its automotive brands news and
              product and service information, please provide your contact preferences below.
            </p>
            <p class="marketing-prompt">
              I would like to receive marketing <span class="underline-text">communications</span> from Adamas Motors &amp; its brands via:
            </p>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.marketingPhone" />
                <span>Phone</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.marketingEmail" />
                <span>Email</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.marketingSms" />
                <span>SMS / MMS</span>
              </label>
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            {{ isSubmitting ? 'SUBMITTING...' : 'SUBMIT DETAILS' }}
          </button>

          <div v-if="submitMessage" :class="['submit-message', submitSuccess ? 'success' : 'error']">
            {{ submitMessage }}
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  enquiryType: "",
  marketingPhone: false,
  marketingEmail: false,
  marketingSms: false,
});

const isSubmitting = ref(false);
const submitMessage = ref("");
const submitSuccess = ref(false);

const onSubmit = async () => {
  isSubmitting.value = true;
  submitMessage.value = "";

  const typeMap = {
    "sales": "PURCHASE_INTENTION",
    "test-drive": "TEST_DRIVE",
    "service": "SERVICE_SUPPORT",
    "general": "BUSINESS",
  };

  try {
    const response = await fetch(`${config.public.apiURL}api/front/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        siteCode: "chery_xt",
        type: typeMap[form.enquiryType] || "BUSINESS",
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        marketingPhone: form.marketingPhone,
        marketingEmail: form.marketingEmail,
        marketingSms: form.marketingSms,
      }),
    });

    const res = await response.json();
    if (res.code === 0) {
      submitSuccess.value = true;
      submitMessage.value = "Thank you for your enquiry. We will get back to you shortly.";
      form.firstName = "";
      form.lastName = "";
      form.email = "";
      form.phone = "";
      form.enquiryType = "";
      form.marketingPhone = false;
      form.marketingEmail = false;
      form.marketingSms = false;
    } else {
      submitSuccess.value = false;
      submitMessage.value = "Something went wrong. Please try again.";
    }
  } catch {
    submitSuccess.value = false;
    submitMessage.value = "Something went wrong. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.enquire-page {
  background: #0d0d0d;
  color: white;
  min-height: 100vh;

  .enquire-layout {
    display: flex;
    min-height: 100vh;
    padding-top: 0.72rem;

    .enquire-image {
      flex: 0 0 42%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .enquire-form-wrapper {
      flex: 1;
      padding: 0.6rem 0.6rem 0.6rem 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .form-heading {
        font-family: Saira, SairaExpanded, sans-serif;
        font-size: 0.36rem;
        font-weight: 300;
        color: #ffffff;
        margin-bottom: 0.4rem;
      }

      .enquire-form {
        .form-row {
          display: flex;
          gap: 0.2rem;
          margin-bottom: 0.04rem;
          .form-group {
            flex: 1;
          }
        }

        .form-group {
          margin-bottom: 0.04rem;

          input,
          select,
          textarea {
            width: 100%;
            padding: 0.12rem 0;
            background: transparent;
            border: none;
            border-bottom: 0.01rem solid rgba(255, 255, 255, 0.2);
            color: white;
            font-family: Saira, sans-serif;
            font-size: 0.14rem;
            outline: none;
            transition: border-color 0.3s;
            &:focus {
              border-bottom-color: #67B0C4;
            }
            &::placeholder {
              color: rgba(255, 255, 255, 0.4);
              font-size: 0.13rem;
            }
          }

          select {
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.04rem center;
            padding-right: 0.2rem;
            option {
              background: #1a1a1a;
              color: white;
            }
          }

          textarea {
            resize: vertical;
            min-height: 0.6rem;
            line-height: 0.22rem;
          }

          &.full-width {
            width: 100%;
          }
        }

        .marketing-section {
          margin-top: 0.32rem;
          padding-top: 0.28rem;
          border-top: 0.01rem solid rgba(255, 255, 255, 0.1);

          .marketing-title {
            font-family: Saira, SairaExpanded, sans-serif;
            font-size: 0.15rem;
            font-weight: 600;
            color: #ffffff;
            letter-spacing: 0.02rem;
            margin-bottom: 0.14rem;
          }

          .marketing-desc {
            font-size: 0.12rem;
            line-height: 0.2rem;
            color: rgba(255, 255, 255, 0.55);
            margin-bottom: 0.16rem;
          }

          .marketing-prompt {
            font-size: 0.12rem;
            color: rgba(255, 255, 255, 0.7);
            font-style: italic;
            margin-bottom: 0.16rem;
            .underline-text {
              text-decoration: underline;
            }
          }

          .checkbox-group {
            display: flex;
            gap: 0.3rem;
            .checkbox-label {
              display: flex;
              align-items: center;
              gap: 0.08rem;
              font-size: 0.13rem;
              color: rgba(255, 255, 255, 0.8);
              cursor: pointer;
              input[type="checkbox"] {
                width: 0.14rem;
                height: 0.14rem;
                cursor: pointer;
                accent-color: #67B0C4;
              }
            }
          }
        }

        .submit-btn {
          display: block;
          width: 100%;
          height: 0.44rem;
          margin-top: 0.36rem;
          background: transparent;
          border: 0.01rem solid rgba(255, 255, 255, 0.3);
          color: white;
          font-family: Saira, SairaExpanded, sans-serif;
          font-size: 0.13rem;
          font-weight: 500;
          letter-spacing: 0.04rem;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            border-color: #67B0C4;
            color: #67B0C4;
          }
          &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
          }
        }

        .submit-message {
          margin-top: 0.2rem;
          text-align: center;
          font-size: 0.14rem;
          &.success {
            color: #4caf50;
          }
          &.error {
            color: #f44336;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .enquire-page {
    .enquire-layout {
      flex-direction: column;
      padding-top: 0.52rem;

      .enquire-image {
        flex: none;
        height: 2rem;
      }

      .enquire-form-wrapper {
        padding: 0.4rem 0.3rem;

        .form-heading {
          font-size: 0.28rem;
          margin-bottom: 0.3rem;
        }

        .enquire-form {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }
      }
    }
  }
}
</style>
